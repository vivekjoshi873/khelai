import { Mail, MapPin, Phone } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="bg-background py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[36px] font-bold bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-transparent bg-clip-text">
            Contact Us
          </h2>
          <p className="mt-4 text-lg text-muted-foreground mx-auto max-w-2xl">
            Here’s how you can contact us for any questions or concerns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-8 bg-card rounded-xl border">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-muted mb-5">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-base text-muted-foreground mb-2">Phone</h3>
            <a
              href="tel:+918800440122"
              className="text-lg font-medium text-primary hover:underline"
            >
              +91 88004-40122
            </a>
          </div>

          <div className="flex flex-col items-center text-center p-8 bg-card rounded-xl border">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-muted mb-5">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-base text-muted-foreground mb-2">Email</h3>
            <a
              href="mailto:vaibhav@khel.ai"
              className="text-lg font-medium text-primary hover:underline"
            >
              vaibhav@khel.ai
            </a>
          </div>

          <div className="flex flex-col items-center text-center p-8 bg-card rounded-xl border">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-muted mb-5">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-base text-muted-foreground mb-2">Address</h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              ELCASSICO SPORTSTECH PRIVATE LIMITED, POCKET 40 HOUSE NO. 153,
              THIRD FLOOR, CR PARK, NEW DELHI, Chittranjan Park, South Delhi,
              New Delhi, Delhi, India, 110019
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
