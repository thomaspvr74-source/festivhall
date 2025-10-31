export default function Footer() {
  return (
    <footer className="site-footer mt-12">
      <div className="container-max py-8 flex flex-col md:flex-row justify-between items-start gap-6">
        <div>
          <div className="text-xl font-bold">Festiv'Hall — Lyon</div>
          <div className="text-sm text-slate-300 mt-2">contact@festivhall-lyon.fr — +33 4 12 34 56 78</div>
        </div>
        <div className="text-sm text-slate-300">
          <div>Adresse fictive • 69000 Lyon</div>
          <div className="mt-2">© {new Date().getFullYear()} Festiv'Hall</div>
        </div>
      </div>
    </footer>
  );
}
