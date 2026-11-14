export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper-deep">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-serif text-xl font-semibold text-ink">Campus Diaries</p>
          <p className="mt-1 text-sm text-muted">
            The official publication and podcast of the club.
          </p>
        </div>
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} Campus Diaries. All rights reserved.
        </p>
      </div>
    </footer>
  );
}