// With `output: 'hybrid'` configured:
// export const prerender = false;
import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";


enum Role {
    user = "user",
    admin = "admin",
    publisher = "publisher"
}

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const username = formData.get("username")?.toString();

  if (!email || !password || !username) {
    return new Response("Email and password are required", { status: 400 });
  }
  
  const { error , data} = await supabase.auth.signUp({
    email,
    password,
    options: {
        data: {
            username: username,
            role: Role.user
        }
    }
  });

  console.log(email);


  console.log(error);
  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return redirect("/signin");
};