<?php

declare(strict_types = 1);

namespace Vertriebsportal\Infrastructure\Subscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;

final class CorsSubscriber implements EventSubscriberInterface
{
    public function onKernelResponse(ResponseEvent $event): void
    {
        if (!$event->isMasterRequest()) {
            return;
        }

        if (array_key_exists('CORS_ALLOW_ORIGIN', $_ENV)) {
            $event->getResponse()->headers->set('Access-Control-Allow-Origin', $_ENV['CORS_ALLOW_ORIGIN']);
        }

        if (array_key_exists('CORS_ALLOW_HEADERS', $_ENV)) {
            $event->getResponse()->headers->set('Access-Control-Allow-Headers', $_ENV['CORS_ALLOW_HEADERS']);
        }

        if (array_key_exists('CORS_ALLOW_METHODS', $_ENV)) {
            $event->getResponse()->headers->set('Access-Control-Allow-Methods', $_ENV['CORS_ALLOW_METHODS']);
        }
    }

    public function onKernelRequest(RequestEvent $event): void
    {
        if (!$event->isMasterRequest()) {
            return;
        }

        if ('OPTIONS' === $event->getRequest()->getRealMethod()) {
            $response = new Response();
            $event->setResponse($response);
        }
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::RESPONSE => 'onKernelResponse',
            KernelEvents::REQUEST => ['onKernelRequest', 255],
        ];
    }
}
