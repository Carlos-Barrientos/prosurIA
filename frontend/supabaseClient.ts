import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://xbgyceasmylqlgoipgsr.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhiZ3ljZWFzbXlscWxnb2lwZ3NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0NzI4MzQsImV4cCI6MjEwNDA0ODgzNH0.0Fex9khlz9KLUvM4wHVAliXi9N2e6wQSt4pPj2QkXHQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
