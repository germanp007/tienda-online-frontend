import CustomLogo from "@/components/custom/CustomLogo";
import { footerLinks } from "@/constants/constants";
import { Link } from "react-router";

const CustomFooter = () => {
  return (
    <footer className="border-t py-12 px-4 lg:px-8 mt-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <CustomLogo />
            <p className="text-sm text-muted-foreground">
              Ropa inspirada en el diseño minimalista y la innovación de Tesla.
            </p>
          </div>
          {footerLinks.map((element) => {
            return (
              <div>
                <h4 className="font-medium mb-4">{element.title}</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {element?.links.map((links) => {
                    return (
                      <li>
                        <Link to={links.href} className="hover:text-foreground">
                          {links.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
         
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Tesla Style. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default CustomFooter;
