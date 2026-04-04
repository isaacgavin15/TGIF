const footerLogoMap = {
  idle: {
    src: "/logo/Assets-03.webp",
    alt: "Footer logo before selection",
    className: "logo-before",
  },
  spinning: {
    src: "/logo/Assets-04.webp",
    alt: "Footer logo while spinning",
    className: "logo-after",
  },
  verseDone: {
    src: "/logo/Assets-05.webp",
    alt: "Footer logo after verse selection",
    className: "logo-verse",
  },
};

export default function FooterLogo({ variant }) {
  if (variant === "hidden") {
    return null;
  }

  const logo = footerLogoMap[variant] ?? footerLogoMap.idle;

  return (
    <div className="footerLogo">
      <img src={logo.src} alt={logo.alt} className={logo.className} />
    </div>
  );
}
