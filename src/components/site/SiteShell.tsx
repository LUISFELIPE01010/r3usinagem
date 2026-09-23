import { Header } from "./Header"; import { Footer } from "./Footer"; import { WhatsAppFab } from "./WhatsAppFab";
export function SiteShell({children,transparent=false}:{children:React.ReactNode;transparent?:boolean}){return <div className="min-h-screen bg-background"><Header transparent={transparent}/><main>{children}</main><Footer/><WhatsAppFab/></div>}
