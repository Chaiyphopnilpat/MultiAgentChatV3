import { Switch, Route, Link } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import ChatUI from "@/pages/ChatUI";
import OrgChart from "@/components/OrgChart";
import MissionDashboard from "@/pages/MissionDashboard";
import StrategyRecommender from "@/pages/StrategyRecommender";
import Navbar from "@/components/Navbar";

function Router() {
  return (
    <Switch>
      {/* Add pages below */}
      <Route path="/" component={ChatUI}/>
      <Route path="/org-chart" component={OrgChart}/>
      <Route path="/mission-dashboard" component={MissionDashboard}/>
      <Route path="/strategy-recommender" component={StrategyRecommender}/>
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main>
            <Router />
          </main>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
