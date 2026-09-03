import { Modal } from 'antd'

export function isNetworkError(error: unknown): boolean {
  if (!error) return false
  if (typeof error === 'object' && error !== null && 'response' in error) {
    return (error as { response?: unknown }).response === undefined
  }
  if (error instanceof TypeError) return true
  const msg = String((error as { message?: string })?.message ?? error)
  return /failed to fetch|networkerror|network request failed|load failed|err_internet_disconnected/i.test(msg)
}

/**
 * 文件下载失败时的网络问题提示弹窗，建议用户更换网络或使用热点
 */
export function showNetworkErrorTip(): void {
  Modal.warning({
    title: '下载失败：网络连接异常',
    content: '可能由 DNS 解析失败或网络不稳定导致，请尝试更换网络（如切换 Wi-Fi），或开启手机热点后重试。',
    okText: '知道了',
  })
}
