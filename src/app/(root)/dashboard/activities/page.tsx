
const Activities = () => {
	const activities = [
		{
			id: 1,
			text: "Deleted Vendor From Client List",
			meta: "Vendor Name",
			time: "39 mins ago",
		},
		{ id: 2, text: "Liked a Forum Chat", meta: "Topic", time: "51 mins ago" },
		{
			id: 3,
			text: "Case Closed",
			meta: "Case Title - Case ID",
			time: "2 hrs ago",
		},
		{
			id: 4,
			text: "Sent a Direct Message",
			meta: "Message first paragraph",
			time: "Today 12:47 PM CST",
		},
		{
			id: 5,
			text: "Replied a Direct Message",
			meta: "Message first paragraph",
			time: "Jan 20, 2023 12:47 PM CST",
		},
	];

	return (
		<div className="w-11/12 m-auto py-2 px-4 bg-white shadow-md rounded-xl border border-gray-225">

            <h1 className="pb-4 text-base font-bold text-gray-55">Recent Activities</h1>

			{activities.map((item) => (
				<div
					key={item.id}
					className="flex md:flex-row flex-col border rounded-xl shadow-md  bg-white border-gray-225 justify-between md:items-center px-4 py-3 mb-2 text-sm"
				>
					<div>
						<p className="font-medium text-sm text-gray-55">{item.text}</p>
						<p className=" text-xs text-gray-55">{item.meta}</p>
					</div>
					<span className="text-xs rounded-full px-2 py-1 bg-[#F1F1F1] text-gray-55 whitespace-nowrap">
						{item.time}
					</span>
				</div>
			))}
		</div>
	);
};

export default Activities;
