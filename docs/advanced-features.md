# Advanced Features & Integration Notes

## Recording (Cloud Recording / VOD)
- ZEGOCLOUD provides Cloud Recording / REST APIs to record streams to cloud storage.
- Typical approach:
  1. Use Zego's recording API to start/stop recordings server-side or via SDK.
  2. Store recorded files to S3-compatible storage or Zego's storage.
  3. Generate VOD playback URLs (HLS) for large audiences.

## Co-host (Guest joining on camera)
- Use Zego prebuilt kit co-host feature or implement "invite" flow:
  - Host sends co-host invite to a viewer (via your backend or Zego IM).
  - Viewer joins with role 'co-host', and SDK handles camera rendering.

## Virtual Gifts / Coins System
- Implement a microtransaction service (eg. Stripe / in-app purchases).
- Gifts flow:
  1. Viewer purchases coins.
  2. Viewer spends coins to send gift (POST /api/gift).
  3. Backend validates, records gift, and emits real-time event (via WebSocket or Zego IM) to update UI.
- Important: real money flows require compliance and security.

## Moderation & Safety
- Implement rate limits, content filters, and block lists.
- Provide host tools to mute/kick viewers, block comments.

