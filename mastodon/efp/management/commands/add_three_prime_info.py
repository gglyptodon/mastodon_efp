from efp.models import Gene
from django.core.management.base import BaseCommand, CommandError
import logging
logging.basicConfig()
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
class Command(BaseCommand):
    help = 'Add three prime bias info to genes from csv'

    def add_arguments(self, parser):
        parser.add_argument('threeprime_csv', type=str)

    def handle(self, *args, **options):
        with open(options['threeprime_csv'], 'r') as infile:
            for line in infile:
                gene_id, num =  line.strip().split(",")
                try:
                    g = Gene.objects.get(pk=gene_id)
                    try:
                        num = float(num)
                    except ValueError as e:
                        num = None
                    if not g.threeprime_bias:
                        g.threeprime_bias = num
                        g.save()
                        logger.info('Successfully added info to {}. Now: {} '.format(gene_id, num))

                except Gene.DoesNotExist:
                    logger.error("Gene {} does not exist".format(gene_id))
                    #raise CommandError("Gene {} does not exist".format(gene_id))

