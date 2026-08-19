# Conversion Events Foundation

Phase 4 defines event names for future analytics integration. No analytics provider is installed or called yet.

## Planned Events

| Event | Trigger |
| --- | --- |
| `view_service` | Visitor views or opens a service offering |
| `click_start_project` | Visitor follows a primary Start a Project CTA |
| `click_whatsapp` | Visitor opens the configured WhatsApp contact link |
| `start_inquiry` | Visitor starts interacting with the inquiry form |
| `submit_inquiry` | Inquiry is successfully accepted by the future backend |

## Implementation Notes

- Event names should remain provider-agnostic.
- `submit_inquiry` must only fire after the backend confirms a successful submission.
- No GA4, Meta Pixel, Conversion API, or other tracking script is included in Phase 4.
- Consent and privacy requirements must be reviewed before production analytics is enabled.
