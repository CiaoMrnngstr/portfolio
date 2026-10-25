import {
  Bike,
  ShieldCheck,
  Store,
  UserRound,
  Zap,
  ArrowUpRight,
} from "lucide-react";

export default function DeliveryPreview() {
  return (
    <div
      className="delivery-preview"
      role="img"
      aria-label="Bitulok Express architecture: Admin and Restaurant web apps, Customer and Rider mobile apps, connected by Firebase."
    >
      <div className="preview-topline">
        <span>
          <span className="status-dot" />
          BITULOK EXPRESS
        </span>
        <ArrowUpRight size={17} />
      </div>
      <div className="delivery-map" aria-hidden="true">
        <div className="map-orbit orbit-a" />
        <div className="map-orbit orbit-b" />
        <div className="map-center">
          <Zap size={30} fill="currentColor" />
          <strong>
            bitulok<span>express</span>
          </strong>
        </div>
        <div className="role-node node-admin">
          <span>
            <ShieldCheck size={20} />
          </span>
          <strong>Admin</strong>
          <small>Vite · Web</small>
        </div>
        <div className="role-node node-restaurant">
          <span>
            <Store size={20} />
          </span>
          <strong>Restaurant</strong>
          <small>Vite · Web</small>
        </div>
        <div className="role-node node-customer">
          <span>
            <UserRound size={20} />
          </span>
          <strong>Customer</strong>
          <small>Expo · Mobile</small>
        </div>
        <div className="role-node node-rider">
          <span>
            <Bike size={20} />
          </span>
          <strong>Rider</strong>
          <small>Expo · Mobile</small>
        </div>
      </div>
      <div className="preview-bottomline">
        <span>04 ROLES / 01 PLATFORM</span>
        <span>Powered by Firebase</span>
      </div>
    </div>
  );
}
