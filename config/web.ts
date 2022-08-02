const dev = process.env.NODE_ENV !== "production"

export const webUrl = dev ? "http://localhost:3003" : "https://vzdelanibudoucnosti.cz"
