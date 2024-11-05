import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();


  
    if (!email || !password) {
      return new Response("Email and password are required", { status: 400 });
    }
  
    
    const { data, error } = await supabase.auth.updateUser({
        password: password
      })

    if (error) {
      console.log(error)
      return new Response(error.message, { status: 500 });
    }
  
    return redirect("/signin");
    
  };

  export const GET: APIRoute = async ({redirect}) => {
    // You can return a simple message or render a page for the forgot password
    return redirect("/signin");
};
