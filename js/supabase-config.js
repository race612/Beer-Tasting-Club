// js/supabase-config.js
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://pztbvadcgxucpctreosk.supabase.co'
const supabaseKey = 'sb_publishable_AaVx_xYq1qmJFWkXFDIF8w_0fYAioT6'

export const supabase = createClient(supabaseUrl, supabaseKey)