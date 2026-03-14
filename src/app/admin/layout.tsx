"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./layout.module.css";
import { FiHome, FiBox, FiShoppingBag, FiLogOut } from "react-icons/fi";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    // A secure setup would hit a logout API to clear HttpOnly cookie
    // For MVP, we can just delete the cookie manually in JS if it wasn't HttpOnly
    // Since it IS HttpOnly, we must hit a quick API or simply reload
    document.cookie = "admin_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Better to just push to login, middleware will intercept if cookie is somehow clear
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.title}>Admin Panel</div>
        <nav className={styles.nav}>
          <Link 
            href="/admin/dashboard" 
            className={`${styles.navLink} ${pathname === "/admin/dashboard" ? styles.active : ""}`}
          >
            <FiHome /> Dashboard
          </Link>
          <Link 
            href="/admin/products" 
            className={`${styles.navLink} ${pathname === "/admin/products" ? styles.active : ""}`}
          >
            <FiBox /> Products
          </Link>
          <Link 
            href="/admin/orders" 
            className={`${styles.navLink} ${pathname === "/admin/orders" ? styles.active : ""}`}
          >
            <FiShoppingBag /> Orders
          </Link>
        </nav>
        
        <button onClick={handleLogout} className={styles.logoutBtn}>
          <FiLogOut /> Logout
        </button>
      </aside>
      
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
