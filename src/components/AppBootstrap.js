// "use client";

// import { useEffect } from "react";
// import { useDsaStore } from "@/store/dsaStore";

// export default function AppBootstrap({ children }) {
//   const init = useDsaStore((s) => s.initialize);

//   const initialized = useDsaStore((s) => s.initialized);

//   useEffect(() => {
//     init();
//   }, [init]);

//   if (!initialized) {
//     return (
//       <div className="p-6 text-gray-600">
//         Loading DSA data...
//       </div>
//     );
//   }

//   return children;
// }











"use client";

import { useEffect } from "react";
import { useDsaStore } from "@/store/dsaStore";

export default function AppBootstrap({ children }) {
  const initialize = useDsaStore((s) => s.initialize);
  const initialized = useDsaStore((s) => s.initialized);

  useEffect(() => {
    if (typeof initialize === "function") {
      initialize();
    }
  }, [initialize]);

  if (!initialized) {
    return (
      <div className="p-6 text-gray-600">
        Loading DSA data...
      </div>
    );
  }

  return children;
}
