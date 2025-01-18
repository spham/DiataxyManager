import { useQuery } from "@tanstack/react-query";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { SelectBadge, SelectProgress } from "@db/schema";

interface CategoryProgress {
  category: string;
  total: number;
  completed: number;
}

interface ProgressStats {
  categories: CategoryProgress[];
  recentBadges: SelectBadge[];
  nextAchievements: SelectBadge[];
  totalProgress: number;
}

export function ProgressTracker() {
  const { data: stats } = useQuery<ProgressStats>({
    queryKey: ["/api/progress/stats"],
  });

  if (!stats) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Overall Progress */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Documentation Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.categories.map((cat) => (
              <div key={cat.category} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="capitalize">{cat.category}</span>
                  <span className="text-muted-foreground">
                    {cat.completed}/{cat.total}
                  </span>
                </div>
                <Progress value={(cat.completed / cat.total) * 100} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {stats.recentBadges.map((badge) => (
              <motion.div
                key={badge.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-2 p-2 rounded-lg bg-accent"
              >
                <div className="p-2 rounded-full bg-accent-foreground/10">
                  <Award className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-sm">{badge.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {badge.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Achievements */}
      <Card className="md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">
            Next Achievements to Unlock
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.nextAchievements.map((badge) => (
              <div
                key={badge.id}
                className="p-4 rounded-lg border bg-card/50 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-muted-foreground" />
                  <h4 className="font-medium">{badge.name}</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  {badge.description}
                </p>
                <Badge variant="secondary" className="mt-2">
                  {badge.requirement}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
