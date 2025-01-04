import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation"; 
import { cookies } from "next/headers";
import Dashboard from "./Dashboard"; 

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/"); 
  }

  return <Dashboard />;
}
