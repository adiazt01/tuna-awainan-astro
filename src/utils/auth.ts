import { supabase } from "../lib/supabase";

export async function getProfileSession(Astro) {
    const { cookies } = Astro;
    const accessToken = cookies.get("sb-access-token");
    const refreshToken = cookies.get("sb-refresh-token");

    if (accessToken && refreshToken) {
        let session = await supabase.auth.setSession({
            refresh_token: refreshToken.value,
            access_token: accessToken.value,
        });

        try {
            if (session.error) {
                Astro.cookies.delete("sb-access-token", {
                    path: "/",
                });
                Astro.cookies.delete("sb-refresh-token", {
                    path: "/",
                });
                return Astro.redirect("/signin");
            }
        } catch (error) {
            // Si hay un error al establecer la sesión, borra las cookies y redirige a la página de inicio de sesión
            Astro.cookies.delete("sb-access-token", {
                path: "/",
            });
            Astro.cookies.delete("sb-refresh-token", {
                path: "/",
            });
            return Astro.redirect("/signin");
        }

        const { data, error } = await supabase.from("users").select("*").eq("id", session?.data?.user?.id)

        if (error) {
            return null;
        }

        return { session: session, profile: data[0] };
    }
    return {
        session: null,
        profile: null
    }
}