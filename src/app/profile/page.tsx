import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import Bet from "../_components/bet";
import { SiRubygems } from "react-icons/si";

async function Profile() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/login");
  }

  const userBets = await api.user.getUserBets();
  const completedBets = userBets.filter(
    (bet) => bet.bet.result === "win" || bet.bet.result === "loss",
  );
  const activeBets = userBets.filter((bet) => bet.bet.result === "pending");
  const wins = completedBets.filter((bet) => bet.bet.result === "win");

  return (
    <div className="flex flex-col gap-4 bg-slate-50">
      <Card className="p-6">
        <CardHeader>
          <CardTitle className="text-4xl">{session.user.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bets </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userBets.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wins </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{wins.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tokens</CardTitle>
            </CardHeader>
            <CardContent className="flex items-baseline gap-2">
              <div className="text-2xl font-bold">{session.user.tokens}</div>
              <SiRubygems />
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      <Card className="p-6">
        <CardHeader>
          <CardTitle className="text-4xl">Bets</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active" className="">
            <TabsList>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="active">
              <div className="grid grid-cols-2 gap-4">
                {activeBets.map((bet) => (
                  <Bet bet={bet.bet} game={bet.game} key={bet.game.id} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="completed">
              <div className="grid grid-cols-2 gap-4">
                {completedBets.map((bet) => (
                  <Bet bet={bet.bet} game={bet.game} key={bet.game.id} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default Profile;
