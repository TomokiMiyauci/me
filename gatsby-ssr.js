// const { register } = require("esbuild-register/dist/node");
// const { SITE_URL } = require("./config/constants");
// const React = require("react");
// const { Helmet } = require("react-helmet");
// const { JsonLd } = require("react-schemaorg");
// register({
//   target: "node15",
// });

// exports.onRenderBody = ({ setHeadComponents, pathname }, pluginOptions) => {
//   const url = new URL(pathname, SITE_URL);

//   const lsJson = {
//     "@context": "https://schema.org",
//     "@type": "BreadcrumbList",
//     itemListElement: [
//       {
//         "@type": "ListItem",
//         position: 1,
//         name: "Home",
//         item: SITE_URL,
//       },
//       {
//         "@type": "ListItem",
//         position: 2,
//         name: "Blog",
//         item: url.toString(),
//       },
//     ],
//   };

//   console.log(JSON.stringify(lsJson));
// };

// export function GraceHopper() {
//   return (
//     <JsonLd<Person>
//       item={{
//         "@context": "https://schema.org",
//         "@type": "Person",
//         name: "Grace Hopper",
//         alternateName: "Grace Brewster Murray Hopper",
//         alumniOf: {
//           "@type": "CollegeOrUniversity",
//           name: ["Yale University", "Vassar College"],
//         },
//         knowsAbout: ["Compilers", "Computer Science"],
//       }}
//     />
//   );
// }
