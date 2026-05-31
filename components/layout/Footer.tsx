import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#ECDFD0] bg-[#FBF6F0]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-sm font-medium text-[#8A7A6A]">
            © {new Date().getFullYear()} ShopGenie. All rights reserved.
          </div>
          
          <div className="flex gap-6">
            <Link
              href="/about"
              className="text-sm font-semibold text-[#8A7A6A] hover:text-[#C2683C] transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-semibold text-[#8A7A6A] hover:text-[#C2683C] transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/terms"
              className="text-sm font-semibold text-[#8A7A6A] hover:text-[#C2683C] transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
