
import "../styles/scss/customTheme.scss"
import NavBar from "./navbar";


export const metadata = {
  title: "BTS",
  description: "BTS by wethinkcode_",
  icons: {
    icon: "./image.png",
  },
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="./favicon.ico" sizes="any" />
      <link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
      <link rel="stylesheet" href="src/assets/css/customTheme.min.css"/>

      <link href="https://fonts.googleapis.com/css2?family=Fugaz+One&family=Gruppo&family=Major+Mono+Display&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet"></link>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"/>

      </head>
      <body>
        
        {children}
          <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossOrigin="anonymous"
      ></script>  
      <script src="https://kit.fontawesome.com/7efbc16cd7.js" crossOrigin="anonymous"></script>
      </body>
    </html>
  );
}
