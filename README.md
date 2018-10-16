# QDailyNews
<<<<<<< HEAD
学习项目之仿好奇心日报
=======
试图仿一下好奇心日报，作为学习RN的第一个项目

如有侵犯到什么权益，请立即通知我删除

注意的点：
Warning: setState(...): Cannot update during an existing state transition (such as within render or another component's constructor). Render methods should be a pure function of props and state; constructor side-effects are an anti-pattern, but can be moved to componentWillMount。当报这类错误时，说明你的props和states在渲染的时候更改了。
大体意思就是在render这种需要props和state进行渲染的方法中，不能再对props和state进行更新。React会在props和state改变的时候调用 render进行DOM diff然后渲染，如果在渲染过程中再对props和states进行更改，就陷入死循环了。
>>>>>>> first commit
