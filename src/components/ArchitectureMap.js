import { useState } from "react";
import { Bike, Database, Globe2, Mail, MapPin, ShieldCheck, Smartphone, Store, ArrowDown } from "lucide-react";

const nodes = [
  { id: "admin", label: "Admin", type: "React · Web", Icon: ShieldCheck, detail: "The overview of the operation: account management, order monitoring, and administration.", connection: "React dashboard → Firebase services" },
  { id: "restaurant", label: "Restaurant", type: "React · Web", Icon: Store, detail: "The merchant workspace for menus and incoming orders, connected to the same delivery workflow.", connection: "React dashboard → Firebase services" },
  { id: "customer", label: "Customer", type: "React Native", Icon: Smartphone, detail: "Browse menus, check out with COD or QR Ph, and follow an order through its delivery journey.", connection: "React Native app → Firebase services" },
  { id: "rider", label: "Rider", type: "React Native", Icon: Bike, detail: "The delivery side of an order: rider assignment and delivery tracking, with Google Maps API integration.", connection: "React Native app → Firebase + Google Maps" },
  { id: "firebase", label: "Firebase", type: "Shared platform", Icon: Database, detail: "Firestore stores application data, Cloud Functions runs backend logic, and Hosting serves the web dashboards. Node.js supports the backend services.", connection: "Firestore · Cloud Functions · Hosting · Node.js" },
  { id: "maps", label: "Google Maps", type: "Maps API", Icon: MapPin, detail: "Google Maps API supports the platform's location and delivery tracking features.", connection: "Google Maps API ↔ delivery experience" },
  { id: "sender", label: "Sender", type: "Email service", Icon: Mail, detail: "Sender is the email service integrated into the Bitulok Express platform.", connection: "Email service ↔ platform" },
  { id: "domain", label: "Hostinger", type: "Custom domain", Icon: Globe2, detail: "A Hostinger custom domain provides the platform's web address; the web applications are served by Firebase Hosting.", connection: "Custom domain → Firebase Hosting" },
];

export default function ArchitectureMap() {
  const [selected, setSelected] = useState("firebase");
  const active = nodes.find((node) => node.id === selected);
  function nodeButton(node, className = "") {
    const Icon = node.Icon;
    return <button key={node.id} className={`architecture-node ${className}`}
      aria-pressed={selected === node.id} aria-controls="architecture-detail"
      onClick={() => setSelected(node.id)}>
      <Icon size={20} aria-hidden="true" /><span><strong>{node.label}</strong><small>{node.type}</small></span>
    </button>;
  }
  return (
    <div className="architecture" role="group" aria-label="Interactive Bitulok Express architecture">
      <div className="architecture-heading mono"><span>System map / 01</span><span>Explore a node ↙</span></div>
      <div className="architecture-apps">{nodes.slice(0, 4).map((node) => nodeButton(node))}</div>
      <div className="architecture-connector" aria-hidden="true"><span /><ArrowDown size={16} /></div>
      <div className="architecture-core">{nodeButton(nodes[4], "core-node")}</div>
      <div className="architecture-service-lines" aria-hidden="true" />
      <div className="architecture-services">{nodes.slice(5).map((node) => nodeButton(node))}</div>
      <div id="architecture-detail" className="architecture-detail" aria-live="polite" aria-atomic="true">
        <p className="mono">{active.connection}</p><p>{active.detail}</p>
      </div>
      <p className="architecture-caption mono">Architecture diagram · not an application screenshot</p>
    </div>
  );
}
