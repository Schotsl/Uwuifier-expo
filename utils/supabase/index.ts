import "react-native-url-polyfill/auto";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rqautahsvsoneozemjth.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxYXV0YWhzdnNvbmVvemVtanRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI3ODkxOTMsImV4cCI6MjAwODM2NTE5M30.U9I1JlMkrlBZMpPvfvm9WqKxivcjLTIvYu8LKXFSc4w";

export default createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});
