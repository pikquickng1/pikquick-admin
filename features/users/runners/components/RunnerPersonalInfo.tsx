import { Mail, Phone, MapPin, Bike, Languages, Briefcase, Calendar } from "lucide-react";
import { Runner } from "../types/runner.types";

interface RunnerPersonalInfoProps {
  runner: Runner;
}

export function RunnerPersonalInfo({ runner }: RunnerPersonalInfoProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-text-primary mb-6">Personal Information</h3>

      <div className="space-y-4">
        <div className="bg-neutral-50 rounded-lg p-4 text-text-primary">
          <div className="flex items-center gap-3 mb-2">
            <Mail className="w-5 h-5" />
            <p className="text-sm">Email Address</p>
          </div>
          <p className="text-base text-text-primary font-medium ml-8">{runner.email}</p>
        </div>

        <div className="bg-neutral-50 rounded-lg p-4 text-text-primary">
          <div className="flex items-center gap-3 mb-2">
            <Phone className="w-5 h-5" />
            <p className="text-sm">Phone Number</p>
          </div>
          <p className="text-base text-text-primary font-medium ml-8">{runner.phone}</p>
        </div>

        <div className="bg-neutral-50 rounded-lg p-4 text-text-primary">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-5 h-5" />
            <p className="text-sm">Address</p>
          </div>
          <p className="text-base text-text-primary font-medium ml-8">{runner.address}</p>
        </div>

        <div className="bg-neutral-50 rounded-lg p-4 text-text-primary">
          <div className="flex items-center gap-3 mb-2">
            <Bike className="w-5 h-5" />
            <p className="text-sm">Transport Mode</p>
          </div>
          <p className="text-base text-text-primary font-medium ml-8">Motorcycle</p>
        </div>

        <div className="bg-neutral-50 rounded-lg p-4 text-text-primary">
          <div className="flex items-center gap-3 mb-2">
            <Languages className="w-5 h-5" />
            <p className="text-sm">Languages</p>
          </div>
          <p className="text-base text-text-primary font-medium ml-8">English, Yoruba</p>
        </div>

        <div className="bg-neutral-50 rounded-lg p-4 text-text-primary">
          <div className="flex items-center gap-3 mb-2">
            <Briefcase className="w-5 h-5" />
            <p className="text-sm">Specialization</p>
          </div>
          <p className="text-base text-text-primary font-medium ml-8">Express Delivery</p>
        </div>

        <div className="bg-neutral-50 rounded-lg p-4 text-text-primary">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5" />
            <p className="text-sm">Joined Date</p>
          </div>
          <p className="text-base text-text-primary font-medium ml-8">
            {new Date(runner.joinedDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
