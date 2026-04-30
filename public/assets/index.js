import textContent from "@/AppContent.json"
import logo from "./aqarLogo.png"
//& homeAssets
  import hero from "./home/globalHero.svg"

const appRoutes = {

  global: {
    home: "/global",
    contact: "/global/contact",
    about: "/global/about",
    projectsInstance: "/global/projects",
    specifications: "/global/specifications",
    book: "/global/book",
  },

  user: {
    home: "/user",
  },

  admin: {
    home: "/admin",
  },

  auth : {
    userSignUp: "/auth/user/signup",
    userLogIn: "/auth/user/login",

    adminSignUp: "/auth/admin/signup",
    adminLogIn: "/auth/admin/login",

  },
}

export {logo, appRoutes, textContent}
export const globalAssets = {
  logo,
}
export const homeAssets = {
  logo,
  hero,
}

