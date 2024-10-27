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

  if (!email || !password) {
    return new Response("Email and password are required", { status: 400 });
  }

  console.log(email, password);
  
  const { error , data} = await supabase.auth.signUp({
    email,
    password,
    options: {
        data: {
            username: "TEXT",
            role: Role.user
        }
    }
  });

  console.log(error);
  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return redirect("/signin");
};