/**
 * 加载数据
 * @param data
 */
function loadBossOffBalanceAsset(data){
	detailShowCore(data);
};

/**
 * 保存/提交数据
 * isAuto Boolean false：自动保存(不校验数据)，true:手动保存
 */
function submit(isAuto)
{
	detailSubmit(isAuto);
};