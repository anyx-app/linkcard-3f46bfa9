# Schema Plan

## Overview
This schema supports the LinkCard application, a digital business card solution. The core data model revolves around user profiles and their associated links (social, contact, calendar).

## Tables

### 1. profiles
Stores the core identity and customization settings for a user's digital card.

- **id** (uuid, Primary Key): References `auth.users.id` (1:1 relationship with Auth).
- **username** (text, Unique): The handle used in the public URL (e.g., linkcard.app/username).
- **full_name** (text): Display name.
- **headline** (text): Job title or tagline.
- **bio** (text): Longer description.
- **avatar_url** (text): URL to the profile photo in storage.
- **theme_config** (jsonb): JSON object storing visual preferences (accent color, font, layout style).
    - Example: `{ "primary_color": "#0073e6", "card_style": "modern", "font": "inter" }`
- **qr_config** (jsonb): JSON object storing QR code customization settings.
    - Example: `{ "color": "#000000", "logo_url": "..." }`
- **created_at** (timestamptz): Creation timestamp.
- **updated_at** (timestamptz): Last update timestamp.

### 2. links
Stores the various actionable items on the card: social media links, contact buttons, calendar booking URLs, etc.

- **id** (uuid, Primary Key): Unique identifier for the link.
- **user_id** (uuid, Foreign Key): References `profiles.id`.
- **title** (text): Label for the link (e.g., "LinkedIn", "Book a Meeting").
- **url** (text): The destination URL or data (e.g., "mailto:..." for email).
- **type** (text): Category of the link.
    - Values: `social`, `contact`, `calendar`, `custom`.
- **icon** (text): Icon identifier string (e.g., "linkedin", "calendar", "envelope").
- **is_active** (boolean): Toggle visibility without deleting.
- **position** (integer): Order of appearance on the card.
- **created_at** (timestamptz): Creation timestamp.

## Security (RLS) policies

- **profiles**:
    - `SELECT`: Public (everyone can view profiles).
    - `INSERT/UPDATE/DELETE`: Authenticated users can only modify their own profile (`auth.uid() = id`).
- **links**:
    - `SELECT`: Public.
    - `INSERT/UPDATE/DELETE`: Authenticated users can only modify links linked to their own profile (`auth.uid() = user_id`).
