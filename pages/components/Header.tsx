import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  return (
    <header>
      <nav>
        <Link href="/">
          <span className={router.pathname == "/" ? "active" : ""}>Home</span>
        </Link>
        <Link href="/shop/designs">
          <span className={router.pathname == "/shop/designs" ? "active" : ""}>
            Shop
          </span>
        </Link>
        <Link href="/create">
          <span className={router.pathname == "/create" ? "active" : ""}>
            Create
          </span>
        </Link>
        <Link href="/account/signup">
          <span
            className={router.pathname == "/account/signup" ? "active" : ""}
          >
            Sign Up
          </span>
        </Link>
        <Link href="/account/signin">
          <span
            className={router.pathname == "/account/signin" ? "active" : ""}
          >
            Sign In
          </span>
        </Link>
        <Link href="/cart">
          <span className={router.pathname == "/cart" ? "active" : ""}>
            Cart
          </span>
        </Link>
      </nav>
    </header>
  );
}
