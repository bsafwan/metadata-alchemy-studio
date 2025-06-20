
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { X, Upload, File, Image } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface UploadedFile {
  name: string;
  url: string;
  type: string;
  size: number;
}

interface FileUploaderProps {
  onFilesUploaded: (files: UploadedFile[]) => void;
  maxFiles?: number;
  acceptedTypes?: string[];
}

export default function FileUploader({ 
  onFilesUploaded, 
  maxFiles = 5, 
  acceptedTypes = ['image/*', '.pdf', '.doc', '.docx', '.txt', '.zip'] 
}: FileUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const uploadFile = async (file: File): Promise<UploadedFile | null> => {
    try {
      console.log('Starting upload for file:', file.name);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      console.log('Uploading to path:', filePath);

      const { data, error: uploadError } = await supabase.storage
        .from('project-files')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      console.log('Upload successful:', data);

      const { data: { publicUrl } } = supabase.storage
        .from('project-files')
        .getPublicUrl(filePath);

      console.log('Public URL:', publicUrl);

      return {
        name: file.name,
        url: publicUrl,
        type: file.type,
        size: file.size
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error(`Failed to upload ${file.name}: ${error.message || 'Unknown error'}`);
      return null;
    }
  };

  const handleFileUpload = useCallback(async (files: FileList) => {
    if (files.length === 0) return;

    if (uploadedFiles.length + files.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} files allowed`);
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    const newFiles: UploadedFile[] = [];
    const totalFiles = files.length;

    for (let i = 0; i < totalFiles; i++) {
      const file = files[i];
      console.log(`Uploading file ${i + 1}/${totalFiles}:`, file.name);
      
      const uploadedFile = await uploadFile(file);
      
      if (uploadedFile) {
        newFiles.push(uploadedFile);
      }
      
      setUploadProgress(((i + 1) / totalFiles) * 100);
    }

    const allFiles = [...uploadedFiles, ...newFiles];
    setUploadedFiles(allFiles);
    onFilesUploaded(allFiles);
    setUploading(false);
    setUploadProgress(0);

    if (newFiles.length > 0) {
      toast.success(`${newFiles.length} file(s) uploaded successfully`);
    } else {
      toast.error('No files were uploaded successfully');
    }
  }, [uploadedFiles, maxFiles, onFilesUploaded]);

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    onFilesUploaded(newFiles);
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="w-4 h-4" />;
    return <File className="w-4 h-4" />;
  };

  const isImage = (type: string) => type.startsWith('image/');

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="file-upload">Upload Files</Label>
        <div className="mt-2">
          <Input
            id="file-upload"
            type="file"
            multiple
            accept={acceptedTypes.join(',')}
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
            disabled={uploading}
            className="cursor-pointer"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Max {maxFiles} files. Accepted: {acceptedTypes.join(', ')}
        </p>
      </div>

      {uploading && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Upload className="w-4 h-4 animate-pulse" />
            <span className="text-sm">Uploading files...</span>
          </div>
          <Progress value={uploadProgress} />
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <Label>Uploaded Files ({uploadedFiles.length}/{maxFiles})</Label>
          <div className="grid gap-2">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center gap-2 p-2 border rounded">
                {getFileIcon(file.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                {isImage(file.type) && (
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                )}
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={() => removeFile(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
