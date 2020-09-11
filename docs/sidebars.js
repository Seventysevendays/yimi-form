module.exports = {
  docs: [
    { type: 'category', label: 'Home', items: ['home/home'], collapsed: true },
    { type: 'category', label: 'Overview', items: ['overview/graceful', 'overview/highPerformance'], collapsed: true },
    { type: 'category', label: 'Usage', items: ['usage/basic', 'usage/components'], collapsed: true },
    {
      type: 'category', label: 'API', items: [
        'api/core', 'api/form', 'api/formItem', 'api/arrayList', 'api/arrayTable', 'api/arrayAction'], collapsed: true
    }
  ]
};
