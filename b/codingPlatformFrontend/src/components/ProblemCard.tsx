 import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link ,useNavigate} from "react-router-dom";
import { Eye } from "lucide-react";
import { Problem } from "@/types/problem";

interface ProblemCardProps {
  problem: Problem;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ problem }) => {
  const navigate = useNavigate();  
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold">{problem.title}</h2>
            <p className="text-muted-foreground text-sm">
  {(problem.description ?? 'No description available').slice(0, 100)}...
</p>

            <div className="mt-2 flex gap-2">
              <Badge variant="secondary">{problem.difficulty}</Badge>
              <Badge variant="outline">{problem.category}</Badge>
            </div>
          </div>
          <div className="flex items-center">
            <Button asChild variant="ghost" size="icon"  onClick={() => navigate(`/problems/${problem._id}`)}>
                 <Eye className="w-5 h-5" />
              
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProblemCard;