# Custom Audit Pages API Documentation

## Overview
This API allows you to create dynamic custom audit pages that display HTML content for specific clients. Each page is accessible via a unique URL and automatically expires after 30 days.

## Endpoint
**POST** `https://gemhywggtdryovqmalqh.supabase.co/functions/v1/create-custom-audit-page`

## Authentication
Include your API key in the request headers:
```
x-api-key: [Your ADDING_CUSTOM_OFFER_PAGE secret value]
```

## Request Format
Send a POST request with JSON body containing:

```json
{
  "client_name": "John Smith",
  "client_email": "john@example.com", 
  "html_content": "<html><body><h1>Your Custom Audit</h1><p>Content here...</p></body></html>",
  "custom_url": "optional-custom-slug"
}
```

### Required Fields:
- **client_name**: Client's full name
- **client_email**: Client's email address  
- **html_content**: Complete HTML content for the page

### Optional Fields:
- **custom_url**: Custom URL slug (if not provided, will auto-generate from name and email)

## Response Format
### Success (200):
```json
{
  "success": true,
  "url": "https://elismet.com/custom-audits/johnsmith-john@example.com",
  "slug": "johnsmith-john@example.com",
  "expires_at": "2025-10-23T12:00:00Z"
}
```

### Error (400/401/500):
```json
{
  "error": "Error description"
}
```

## URL Structure
Generated URLs follow this pattern:
```
https://elismet.com/custom-audits/{client-name-client-email}
```

Example: `https://elismet.com/custom-audits/johnsmith-john@example.com`

## Example Usage

### cURL Example:
```bash
curl -X POST https://gemhywggtdryovqmalqh.supabase.co/functions/v1/create-custom-audit-page \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY_HERE" \
  -d '{
    "client_name": "John Smith",
    "client_email": "john@example.com",
    "html_content": "<!DOCTYPE html><html><head><title>Audit Report</title></head><body><h1>Custom Audit for John Smith</h1><p>Your audit content goes here...</p></body></html>"
  }'
```

### JavaScript Example:
```javascript
const response = await fetch('https://gemhywggtdryovqmalqh.supabase.co/functions/v1/create-custom-audit-page', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'YOUR_API_KEY_HERE'
  },
  body: JSON.stringify({
    client_name: 'John Smith',
    client_email: 'john@example.com',
    html_content: '<!DOCTYPE html><html><head><title>Audit Report</title></head><body><h1>Custom Audit for John Smith</h1></body></html>'
  })
});

const result = await response.json();
console.log('Page URL:', result.url);
```

## Important Notes
- Pages automatically expire after 30 days
- HTML content is rendered exactly as provided (no modifications)
- Pages are available within 3-4 seconds of creation
- Duplicate requests will update existing pages
- All pages are publicly accessible via their URL (no authentication required to view)

## Error Codes
- **400**: Missing required fields or invalid request format
- **401**: Invalid or missing API key
- **500**: Internal server error

## Security
- Only authorized users with the correct API key can create pages
- Pages have automatic expiration to prevent indefinite storage
- HTML content is sanitized at the browser level but not server-side