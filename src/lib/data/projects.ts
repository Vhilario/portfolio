export type Project = {
    title: string,
    description: string,
    image: string,
    tags: string[],
    link?: string,
    github?: string,
    blogSlug?: string,
}

export const projects: Project[] = [
    {
        title: "This Portfolio",
        description: "This is my portfolio website, built with SvelteKit and Tailwind CSS. It's a simple website that showcases my projects and skills, while also acting as a blog for my thoughts and experiences.",
        image: "/portfolio.png",
        tags: ["SvelteKit", "Tailwind CSS", "TypeScript", "GSAP", "EmailJS", "Shadcn UI"],
        link: "https://vincenthilar.io",
        github: "https://github.com/vhilario/portfolio",
        blogSlug: "my-portfolio",
    },
    {
        title: "NYT Solutions",
        description: "A simple solutions page for the New York Times Games. Made as a fullstack project to practice my skills. Uses Next.js TailwindCSS, and TypeScript. Hosted on Vercel.",
        image: "/nyt-solver.png",
        tags: ["Next.js", "TailwindCSS", "TypeScript", "Vercel"],
        link: "https://simple-nyt-solutions.vercel.app",
        github: "https://github.com/vhilario/simple-nyt-solutions",
        blogSlug: "simple-nyt-solutions",
    },
    {
        title: "Trane Technician App Page",
        description: "A page in the Trane Technician (then Diagnostics) app, which allowed for a proprietary API to be manually sent to Trane Link systems. I worked on this project as part of my internship at Trane Technologies.",
        image: "/trane-technician-app.png",
        tags: ["TypeScript", "React-Native", "React-Redux"],
        link: "https://play.google.com/store/apps/details?id=com.tranetechnologies.tranediagnostics&hl=en_US",
    },
    {
        title: "Over-The-Air Update Project",
        description: "This project was to make a proof-of-concept to speed up OTA updates by utilizing compression. I managed a 55% reduction in update time, and this implementation is currently in production. Done as an intern at Trane Technologies.",
        image: "/trane-ota-update-compression.png",
        tags: ["Embedded C", "Ruby", "Python"],
    },
]