import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-orange-600">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mt-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mt-2 mb-8">
          The page you're looking for doesn't exist in the Ribshack HQ system.
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="size-4 mr-2" />
            Go Back
          </Button>
          <Button
            onClick={() => navigate("/admin/analytics")}
            className="bg-gradient-to-r from-orange-500 to-red-600"
          >
            <Home className="size-4 mr-2" />
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
