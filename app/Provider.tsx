// "use client";

// import Loader from "@/components/Loader";
// import { getDocument } from "@/lib/actions/room.actions";
// import { getClerkUsers, getDocumentUsers } from "@/lib/actions/user.actions";
// import { useUser } from "@clerk/nextjs";

// import {
//   ClientSideSuspense,
//   LiveblocksProvider,
//   RoomProvider,
// } from "@liveblocks/react/suspense";
// import React, { ReactNode } from "react";

// const Provider = ({ children }: { children: ReactNode }) => {
//   const { user: clerkUser } = useUser();

//   return (
//     <LiveblocksProvider
//       authEndpoint="/api/liveblocks-auth"
//       resolveUsers={async ({ userIds }) => {
//         const users = await getClerkUsers({ userIds });
//         return users;
//       }}
//       resolveMentionSuggestions={async ({ text, roomId }) => {
//         const roomUsers = await getDocumentUsers({
//           roomId,
//           currentUser: clerkUser?.emailAddresses[0].emailAddress!,
//           text,
//         });
//       }}
//     >
//       <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
//     </LiveblocksProvider>
//   );
// };

// export default Provider;

"use client";

import Loader from "@/components/Loader";
import { getDocument } from "@/lib/actions/room.actions";
import { getClerkUsers, getDocumentUsers } from "@/lib/actions/user.actions";
import { useUser } from "@clerk/nextjs";

import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
import React, { ReactNode } from "react";

const Provider = ({ children }: { children: ReactNode }) => {
  const { user: clerkUser } = useUser();

  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds });
        return users;
      }}
      resolveMentionSuggestions={async ({ text, roomId }) => {
        const roomUsers = await getDocumentUsers({
          roomId,
          currentUser: clerkUser?.emailAddresses[0].emailAddress!,
          text,
        });
        // Assuming roomUsers is an array of user objects, we need to return an array of strings
        // Adjust this based on the actual structure of your roomUsers data
        return roomUsers.map(
          (user: { name: any; id: any }) => user.name || user.id
        );
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default Provider;
