import { HOME, LOGO, Courses, Institute, Harbour, Placement, Admission } from "../utils/image-constants";
import Image from "next/image";
import Link from "next/link";
import "ultimate-react-multilevel-menu/dist/esm/index.css";
import { Navbar, Collapse, Item, Items } from "ultimate-react-multilevel-menu";
import { usePathname } from 'next/navigation';

const MITNavbar = () => {
  const pathname = usePathname();
  const isDropdownActive = (childPaths : any) => {
    return childPaths.some((path: any) => pathname.startsWith(path));
  };
  return (
    <>
      <header className="top-header">
        <div>
          Attend an <strong>Online Course Overview Session </strong> &nbsp;to know
          more about our Program
          <Link href="/contact-us#contactForm" className="btn-header">
            Register Today
          </Link>
        </div>
      </header>
      <Navbar>
        <Link href="/">
          <Image
            src={LOGO}
            alt="logo"
            height={46}
            width={58}
            className="pointer"
          />
        </Link>
        <Collapse>
          <Item as={"strong"}>
            <Link href="/" className={pathname === '/' ? 'active' : ''}>
              <Image src={HOME} width={18} height={18} alt="home"></Image> Home
            </Link>
          </Item>
          
          <Item as={"strong"}>
            <Link href="/institute" className={pathname?.includes('institute') ? 'active' : ''}>
              <Image src={Institute} width={18} height={18} alt="institute"></Image>Institute
            </Link>
          </Item>
          
          {/* Programs Dropdown */}
          <Items className={`navbar-left ${isDropdownActive([
            '/courses/post-graduate-diploma-in-management-pgdm',
            '/courses/post-graduate-diploma-in-management-pgdm-executive',
            '/courses/post-graduate-diploma-in-business-administration-pgdba',
            '/courses/post-graduate-certificate-in-management',
            '/courses/career-accelerator-programs-cap',
            '/courses/professional-certificate-programs'
          ]) ? 'dropdown-active' : ''}`} 
          title={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Image src={Courses} style={{ marginRight: '5px' }} alt="Courses" />
              Programs
            </div>
          } as={"div"}>
            <Item as={"strong"}>
              <Link className={pathname === '/courses/post-graduate-diploma-in-management-pgdm' ? 'active' : ''} href="/courses/post-graduate-diploma-in-management-pgdm">PGDM</Link>
            </Item>
            <Item as={"strong"}>
              <Link className={pathname === '/courses/post-graduate-diploma-in-management-pgdm-executive' ? 'active' : ''} href="/courses/post-graduate-diploma-in-management-pgdm-executive">PGDM Executive</Link>
            </Item>
            <Item as={"strong"}>
              <Link className={pathname === '/courses/post-graduate-diploma-in-business-administration-pgdba' ? 'active' : ''} href="/courses/post-graduate-diploma-in-business-administration-pgdba">PGDBA</Link>
            </Item>
            <Item as={"strong"}>
              <Link className={pathname === '/courses/post-graduate-certificate-in-management' ? 'active' : ''} href="/courses/post-graduate-certificate-in-management">PGCM</Link>
            </Item>
            <Item as={"strong"}>
              <Link className={pathname === '/courses/career-accelerator-programs-cap' ? 'active' : ''} href="/courses/career-accelerator-programs-cap">CAP</Link>
            </Item>
            <Item as={"strong"}>
              <Link className={pathname === '/courses/professional-certificate-programs' ? 'active' : ''} href="/courses/professional-certificate-programs">Professional Certificate Courses</Link>
            </Item>
          </Items>

          {/* Academics Dropdown */}
          <Items className={`navbar-left ${isDropdownActive([
            '/mit-harbour',
            'https://mitsde.com/bootcamp',
            'https://mitsde.com/entrepreneurship-development-cell'
          ]) ? 'dropdown-active' : ''}`} 
          title={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Image src={Harbour} style={{ marginRight: '5px' }} alt="Academics" />
              Academics
            </div>
          } as={"div"}>
            <Item as={"strong"}>
              <Link className={pathname === '/mit-harbour' ? 'active' : ''} href="/mit-harbour">MIT Harbour</Link>
            </Item>
            <Item as={"strong"}>
              <Link className={pathname === 'https://mitsde.com/bootcamp' ? 'active' : ''} href="https://mitsde.com/bootcamp">MITBootcamp</Link>
            </Item>
            <Item as={"strong"}>
              <Link className={pathname === 'https://mitsde.com/entrepreneurship-development-cell' ? 'active' : ''} href="https://mitsde.com/entrepreneurship-development-cell">MITSDE ED Cell</Link>
            </Item>
          </Items>

          <Item as={"strong"}>
            <Link href="/placement" className={pathname?.includes('placement') ? 'active' : ''}>
              <Image src={Placement} width={18} height={18} alt="placement"></Image>Placement
            </Link>
          </Item>
          <Item as={"strong"}>
            <Link href="/admission" className={pathname?.includes('admission') ? 'active' : ''}>
              <Image src={Admission} width={18} height={18} alt="admission"></Image>Admission
            </Link>
          </Item>
          
          <div className="navbar-right">
            <Items title="Resources" as={"div"}>
              <Item as={"strong"}>
                <Link className={pathname === '/blogs' ? 'active' : ''} href="/blogs">Blogs</Link>
              </Item>
              <Item as={"strong"}>
                <Link className={pathname === '/our-videos' ? 'active' : ''} href="/our-videos">Our Videos</Link>
              </Item>
            </Items>
            <Item className="not-item" as={"strong"}>
              <Link className={pathname === '/about-us' ? 'active' : ''} href="/about-us">About us</Link>
            </Item>
            <Item className="not-item" as={"strong"}>
              <Link className={pathname === '/contact-us' ? 'active' : ''} href="/contact-us">Contact us</Link>
            </Item>
            <Link href="/contact-us#contactForm" className="btn-navbar">
              Enroll Now
            </Link>
          </div>
        </Collapse>
      </Navbar>
    </>
  );
};

export default MITNavbar;
