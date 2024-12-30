"use client"

import { ClerkProvider, useAuth } from "@clerk/nextjs"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import { 
  AuthLoading,
  Authenticated,
  ConvexProvider,
  ConvexReactClient,
 } from "convex/react"
import { Loading } from "@/components/auth/loading";


 interface ConvexClientProviderProps {
  // kind like a layout
  // protects all of the children with a layer of authentication
  children: React.ReactNode; 
 }

 // ! at the end of a var so it's never Undefined
 // the property is declared in .env.local
 const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

 const convex = new ConvexReactClient(convexUrl);

 export const ConvexClientProvider =({
  children, // destructure the children
 }: ConvexClientProviderProps) => { // :ObjectType
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Authenticated>
          {children}
        </Authenticated>
        <AuthLoading>
          <Loading />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
  
 };