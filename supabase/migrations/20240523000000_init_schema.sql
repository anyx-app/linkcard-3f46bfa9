SET search_path TO proj_9b63dbc3;

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE profiles (
    id UUID PRIMARY KEY, -- 1:1 relationship with auth.users (handled via application logic/triggers)
    username TEXT UNIQUE NOT NULL,
    full_name TEXT,
    headline TEXT,
    bio TEXT,
    avatar_url TEXT,
    theme_config JSONB DEFAULT '{}'::jsonb,
    qr_config JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone" 
ON profiles FOR SELECT 
USING (true);

CREATE POLICY "Users can insert their own profile" 
ON profiles FOR INSERT 
WITH CHECK (id::text = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can update their own profile" 
ON profiles FOR UPDATE 
USING (id::text = current_setting('request.jwt.claims', true)::json->>'sub');

-- Create links table
CREATE TABLE links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    type TEXT CHECK (type IN ('social', 'contact', 'calendar', 'custom')) DEFAULT 'custom',
    icon TEXT,
    is_active BOOLEAN DEFAULT true,
    position INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on links
ALTER TABLE links ENABLE ROW LEVEL SECURITY;

-- Links Policies
CREATE POLICY "Links are viewable by everyone" 
ON links FOR SELECT 
USING (true);

CREATE POLICY "Users can manage their own links" 
ON links FOR ALL 
USING (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub')
WITH CHECK (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

-- Create indexes for performance
CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_links_user_id ON links(user_id);
