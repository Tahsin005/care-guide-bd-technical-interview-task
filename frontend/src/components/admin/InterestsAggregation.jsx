import { Blobatar } from '@blobatar/react';
import { Tag, Users, AlertCircle, Loader2 } from 'lucide-react';
import { useUsersGroupedByInterests } from '../../hooks/useAggregations';

export function InterestsAggregation() {
  const { data, isLoading, isError, refetch } = useUsersGroupedByInterests();

  const groups = data || [];

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl border border-[#e6e9ed] shadow-xs p-12 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-[#3d6157] animate-spin" />
        <p className="text-xs text-[#59766e]">
          Running MongoDB aggregation ($unwind, $group, $sort)...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-10 text-center space-y-4 max-w-md mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-base font-bold text-[#1e293b]">
            Failed to load interests aggregation
          </h3>
          <p className="mt-1 text-xs text-[#59766e]">
            An error occurred while running the aggregation query.
          </p>
        </div>
        <button
          type="button"
          onClick={() => refetch()}
          className="px-4 py-2 bg-[#3d6157] hover:bg-[#34534a] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-[#e6e9ed] shadow-xs max-w-lg mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-[#3d6157]/10 text-[#3d6157] flex items-center justify-center mx-auto">
          <Tag className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-[#1e293b]">No interests found</h3>
        <p className="text-xs text-[#59766e]">
          Users have not tagged any interests yet. As users add interests to their profile, the aggregation pipeline will group them here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-[#e6e9ed] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-[#59766e] font-medium">Unique Interests</p>
            <p className="text-2xl font-bold text-[#1e293b] mt-1">{groups.length}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#3d6157]/10 text-[#3d6157] flex items-center justify-center">
            <Tag className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#e6e9ed] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-[#59766e] font-medium">Total Tagged Members</p>
            <p className="text-2xl font-bold text-[#1e293b] mt-1">
              {groups.reduce((acc, g) => acc + (g.userCount || 0), 0)}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#e6e9ed] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-[#59766e] font-medium">Top Interest</p>
            <p className="text-base font-bold text-[#1e293b] mt-1 capitalize truncate max-w-[160px]">
              {[...groups].sort((a, b) => b.userCount - a.userCount)[0]?.interest || '—'}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <span className="text-xs font-bold">#1</span>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {groups.map((group) => (
          <div
            key={group.interest}
            className="bg-white rounded-3xl border border-[#e6e9ed] shadow-xs p-5 space-y-4 hover:shadow-md transition-shadow"
          >

            <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-[#3d6157]/10 text-[#3d6157] flex items-center justify-center font-bold text-xs uppercase">
                  {group.interest[0]}    
                </span>
                <div>
                  <h3 className="font-bold text-sm text-[#1e293b] capitalize">
                    {group.interest}
                  </h3>
                  <p className="text-[11px] text-[#59766e]">
                    {group.userCount} {group.userCount === 1 ? 'member' : 'members'} interested
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-1 text-xs font-semibold bg-[#f4f6f8] text-[#3d6157] rounded-full border border-[#e6e9ed]">
                {group.userCount} users
              </span>
            </div>


            <div className="space-y-2">
              {group.users?.map((u) => {
                const seed = u.email || u.name || 'User';

                return (
                  <div
                    key={u._id}
                    className="flex items-center justify-between p-2 rounded-xl bg-[#f8fafc] hover:bg-[#f1f5f9] transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0 border border-[#e6e9ed]">
                        <Blobatar
                          name={seed}
                          size={24}
                          animate="hover"
                          title={u.name}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-xs text-[#1e293b] truncate">
                          {u.name}
                        </p>
                        <p className="text-[10px] text-[#59766e] truncate">
                          {u.email}
                        </p>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 text-[10px] font-medium capitalize bg-white text-[#59766e] rounded-md border border-[#e6e9ed] shrink-0">
                      {u.role || 'user'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InterestsAggregation;
