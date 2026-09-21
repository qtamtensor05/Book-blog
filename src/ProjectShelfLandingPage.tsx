import { LandingPageFrame, type LandingPageProps } from "./shaders/landing-pages/LandingPageFrame";
import { splitTypographyProps, usePageTypography, type PageTypographyProps } from "./shaders/landing-pages/pageTypography";
import { COMPLETE_SHELF_TYPOGRAPHY } from "./shaders/landing-pages/pageRecipes";

export function ProjectShelfLandingPage(props: LandingPageProps & PageTypographyProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(COMPLETE_SHELF_TYPOGRAPHY, type);
  return <LandingPageFrame {...frame} customization={customization} title="Book-blog — Giới thiệu dự án" sourceUrl={`${import.meta.env.BASE_URL}landing-pages/book-blog-shelf.html`} />;
}
