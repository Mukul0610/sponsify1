/** @type {import('next').NextConfig} */
const nextConfig = {
 
  
  
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**" // * wildcard on dynamic part of domain url
        }
      ]
    }
  


};

export default nextConfig;

