const Footer = () => {
  return (
    <footer>
      <div className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} My App. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
