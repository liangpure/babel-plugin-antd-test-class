<div>
  <Button>reset</Button>
  <Button><FormattedMessage {...messages.query} /></Button>
  <Button>{formatMessage(Lang.save)}</Button>
  <Button {...rest} >
    {children}
  </Button>
</div>