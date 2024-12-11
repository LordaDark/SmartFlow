import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://tznujuccpbstrcnfbwrj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6bnVqdWNjcGJzdHJjbmZid3JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5MDkzNDksImV4cCI6MjA0OTQ4NTM0OX0.vrckRTQM75xnGn9sGvk-rleKXP26KaowhiIoXQAUW6A';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
