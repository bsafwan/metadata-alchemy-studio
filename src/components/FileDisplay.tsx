
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Eye, Image, File } from 'lucide-react';

interface FileDisplayProps {
  files: Array<{
    name: string;
    url: string;
    type: string;
    size?: number;
  }>;
  showPreview?: boolean;
}

export default function FileDisplay({ files, showPreview = true }: FileDisplayProps) {
  const downloadFile = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="w-4 h-4" />;
    return <File className="w-4 h-4" />;
  };

  const isImage = (type: string) => type.startsWith('image/');

  if (files.length === 0) return null;

  return (
    <div className="space-y-3">
      <h4 className="font-medium text-sm">Attachments ({files.length})</h4>
      <div className="grid gap-3">
        {files.map((file, index) => (
          <div key={index} className="border rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                {getFileIcon(file.type)}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  {file.size && (
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {isImage(file.type) && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(file.url, '_blank')}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => downloadFile(file.url, file.name)}
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
            
            {showPreview && isImage(file.type) && (
              <div className="mt-2">
                <img
                  src={file.url}
                  alt={file.name}
                  className="max-w-full h-auto max-h-48 rounded border"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
