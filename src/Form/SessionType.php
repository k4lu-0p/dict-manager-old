<?php

namespace App\Form;

use App\Entity\Session;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\DateType;


class SessionType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('free')
            ->add('dateStart', DateType::class, [
                'html5' => false,
                'widget' => 'single_text',
                'format' => 'Y-m-d h:i:s',

            ])
            ->add('dateEnd', DateType::class, [
                'html5' => false,
                'widget' => 'single_text',
                'format' => 'Y-m-d h:i:s',

            ])
            // ->add('flatRate')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Session::class,
        ]);
    }
}
